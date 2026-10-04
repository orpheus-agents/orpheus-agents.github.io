# CLI и навык агента

CLI позволяет управлять заданиями через API Space. Навык `orpheus-space` объясняет агенту, как определить автора запроса, выбрать его задания и уточнить расписание.

## Установка

Пример установки в Linux-песочнице Codex. Для arm64 замените `arch=amd64` на `arch=arm64`. Для другого агента выберите его каталог навыков. Команды скачивают CLI и навык из одного [релиза Space](https://github.com/orpheus-agents/orpheus-space/releases), проверяют SHA256 и сохраняют папку `references/`.

```sh
set -eu
version=v0.10.0
arch=amd64
release="https://github.com/orpheus-agents/orpheus-space/releases/download/$version"
for file in "orpheus-space_${version}_linux_${arch}.tar.gz" "orpheus-space_${version}_skill.tar.gz" checksums.txt; do
  curl -fsSLO "$release/$file"
done
sha256sum --check --ignore-missing checksums.txt
mkdir -p "$HOME/.local/bin" "$HOME/.agents/skills"
tar -xzf "orpheus-space_${version}_linux_${arch}.tar.gz" -C "$HOME/.local/bin"
tar -xzf "orpheus-space_${version}_skill.tar.gz" -C "$HOME/.agents/skills"
export PATH="$HOME/.local/bin:$PATH"
orpheus-space --version
```

Добавьте их в [шаблон песочницы](../configuration/templates.md), чтобы они были доступны в новых сессиях. Передайте агенту [переменные CLI](../reference/space.md#cli):

```dotenv
ORPHEUS_SPACE_HOST=https://space.example.com
ORPHEUS_SPACE_API_KEY=<space-api-key>
```

Используйте ключ из [`PUBLIC_API_KEYS` Space](../reference/space.md#access). Адрес задаётся без `/api/v1`. Опишите [сервис](../configuration/secrets.md#services) с обеими ENV, передайте их значения worker Orpheus и выберите сервис в workflow или сессии. Агент получит полные права API-ключа на задания. Выбирайте сервис только для поручений, которым нужно управлять расписаниями.

## Проверка

```sh
orpheus-space services --json
orpheus-space profiles --json
orpheus-space templates --json
orpheus-space schedule list --owner-email alice@example.com --json
```

Навык определяет автора просьбы по подтверждённым метаданным коннектора и работает только с его заданиями. Без подтверждённого email он не должен угадывать владельца. Это инструкции агенту, а не ограничения общего API. [Команды, повторы и правила выбора заданий](../reference/space-cli.md).
