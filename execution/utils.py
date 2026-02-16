import os
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def get_env_var(name, default=None):
    """Safely get an environment variable."""
    return os.getenv(name, default)

def log_process(message):
    """Log a message to the console or a temp file."""
    print(f"[LOG] {message}")
    # You could also append to a .tmp/session.log here

if __name__ == "__main__":
    log_process("Agent utilities initialized.")
