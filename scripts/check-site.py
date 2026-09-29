"""Check local built links, assets and anchors across the static site."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import posixpath

root = Path('docs/.vitepress/dist').resolve()
class Page(HTMLParser):
    def __init__(self,source):
        super().__init__()
        self.ids=set()
        self.links=[]
        self.feed(source)
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if 'id' in attrs: self.ids.add(attrs['id'])
        for key in ['href','src']:
            if key in attrs: self.links.append(attrs[key])
        if 'srcset' in attrs:
            self.links.extend(s.strip().split(' ')[0] for s in attrs['srcset'].split(','))
pages={str(p.relative_to(root)):Page(p.read_text()) for p in root.rglob('*.html')}
errors=[]
for path,page in pages.items():
    for link in page.links:
        url=urlsplit(link)
        if url.scheme or url.netloc: continue
        target=unquote(url.path)
        if not target: target=path
        elif target.startswith('/'): target=target.lstrip('/')
        else: target=posixpath.normpath(posixpath.join(posixpath.dirname(path),target))
        if target.endswith('/') or not target: target+='index.html'
        candidate=root/target
        if not candidate.exists(): errors.append(f'{path}: missing {link}')
        elif url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:
            errors.append(f'{path}: missing anchor {link}')
if errors: raise SystemExit('\n'.join(sorted(set(errors))))
print(f'Checked links, assets and anchors on {len(pages)} HTML pages.')
