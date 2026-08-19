from pathlib import Path
import re
import shutil
import sys
import unicodedata

ROOT = Path(__file__).resolve().parents[1]
PAGES_DIR = ROOT / "pages"


def slugify(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value)
    ascii_value = normalized.encode("ascii", "ignore").decode("ascii")
    slug = re.sub(r"[^a-zA-Z0-9]+", "-", ascii_value).strip("-").lower()
    return slug


def sync_directory(directory: Path) -> tuple[bool, str | None]:
    html_files = sorted(
        p for p in directory.glob("*.html")
        if p.name.lower() != "index.html"
    )
    index_file = directory / "index.html"

    if not html_files:
        return False, None

    if len(html_files) > 1:
        return False, (
            f"{directory.relative_to(ROOT)} possui mais de um HTML-fonte: "
            + ", ".join(p.name for p in html_files)
            + ". Deixe apenas um HTML-fonte ou crie o index.html manualmente."
        )

    source = html_files[0]

    if index_file.exists() and index_file.read_bytes() == source.read_bytes():
        print(f"OK   {directory.relative_to(ROOT)}/index.html já está sincronizado")
        return False, None

    shutil.copyfile(source, index_file)
    print(
        f"SYNC {source.relative_to(ROOT)} -> "
        f"{index_file.relative_to(ROOT)}"
    )
    return True, None


def organize_root_html_files() -> tuple[bool, list[str]]:
    root_html_files = sorted(
        p for p in PAGES_DIR.glob("*.html")
        if p.name.lower() != "index.html"
    )

    if not root_html_files:
        return False, []

    errors: list[str] = []
    slug_sources: dict[str, list[Path]] = {}

    for source in root_html_files:
        slug = slugify(source.stem)
        if not slug:
            errors.append(
                f"Não foi possível gerar uma pasta válida para {source.name}."
            )
            continue
        slug_sources.setdefault(slug, []).append(source)

    for slug, sources in slug_sources.items():
        if len(sources) > 1:
            errors.append(
                f"Os arquivos {', '.join(p.name for p in sources)} geram a mesma "
                f"pasta pages/{slug}/. Renomeie um deles."
            )

    if errors:
        return False, errors

    changed = False

    for slug, sources in sorted(slug_sources.items()):
        source = sources[0]
        destination_dir = PAGES_DIR / slug
        destination_source = destination_dir / source.name

        existing_sources = []
        if destination_dir.exists():
            existing_sources = sorted(
                p for p in destination_dir.glob("*.html")
                if p.name.lower() != "index.html" and p.name != source.name
            )

        if existing_sources:
            errors.append(
                f"Não movi {source.name}: pages/{slug}/ já possui outro HTML-fonte "
                f"({', '.join(p.name for p in existing_sources)})."
            )
            continue

        destination_dir.mkdir(parents=True, exist_ok=True)

        if destination_source.exists():
            destination_source.unlink()

        shutil.move(str(source), str(destination_source))
        print(
            f"MOVE {source.relative_to(ROOT)} -> "
            f"{destination_source.relative_to(ROOT)}"
        )
        changed = True

        did_change, error = sync_directory(destination_dir)
        changed = changed or did_change
        if error:
            errors.append(error)

    return changed, errors


def main() -> int:
    if not PAGES_DIR.exists():
        print("Pasta pages/ não encontrada. Nada para fazer.")
        return 0

    changed, errors = organize_root_html_files()

    directories = sorted(
        p for p in PAGES_DIR.rglob("*") if p.is_dir()
    )

    for directory in directories:
        did_change, error = sync_directory(directory)
        changed = changed or did_change
        if error:
            errors.append(error)

    if errors:
        print("\nERRO: algumas páginas precisam de atenção:")
        for error in errors:
            print(f"- {error}")
        return 1

    if not changed:
        print("Nenhuma página precisou ser organizada ou sincronizada.")

    return 0


if __name__ == "__main__":
    sys.exit(main())
