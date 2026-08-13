from pathlib import Path
import shutil
import sys

ROOT = Path(__file__).resolve().parents[1]
PAGES_DIR = ROOT / "pages"


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
            f"{directory.relative_to(ROOT)} possui mais de um HTML: "
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


def main() -> int:
    if not PAGES_DIR.exists():
        print("Pasta pages/ não encontrada. Nada para fazer.")
        return 0

    changed = False
    errors: list[str] = []

    directories = [PAGES_DIR] + sorted(
        p for p in PAGES_DIR.rglob("*") if p.is_dir()
    )

    for directory in directories:
        did_change, error = sync_directory(directory)
        changed = changed or did_change
        if error:
            errors.append(error)

    if errors:
        print("\nERRO: algumas pastas são ambíguas:")
        for error in errors:
            print(f"- {error}")
        return 1

    if not changed:
        print("Nenhum index.html precisou ser atualizado.")

    return 0


if __name__ == "__main__":
    sys.exit(main())
