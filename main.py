import argparse
from inventory.importer import import_inventory

def main():
    parser = argparse.ArgumentParser(description="Smart Inventory Import Agent")
    parser.add_argument("file_path", type=str, help="Path to the inventory file (.csv, .docx, .pdf)")
    args = parser.parse_args()

    try:
        result = import_inventory(args.file_path)
        print(f"✔ Products added: {result['products_added']}")
        print(f"❌ Errors: {result['errors']}")
        if result['errors'] > 0:
            print("Please check import_errors.log for details.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
