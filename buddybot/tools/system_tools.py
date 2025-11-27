import psutil
import platform
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def get_system_info() -> dict:
    """
    Returns a dictionary of basic system information.
    """
    try:
        info = {
            "os": platform.system(),
            "os_release": platform.release(),
            "os_version": platform.version(),
            "architecture": platform.machine(),
            "processor": platform.processor(),
            "hostname": platform.node(),
        }
        return info
    except Exception as e:
        logging.error(f"Failed to get system info: {e}")
        return {"error": f"Failed to get system info: {e}"}

def get_cpu_usage() -> str:
    """
    Returns the current system-wide CPU utilization as a percentage.
    """
    try:
        return f"Current CPU Usage: {psutil.cpu_percent(interval=1)}%"
    except Exception as e:
        logging.error(f"Error getting CPU usage: {e}")
        return f"Error getting CPU usage: {e}"

def get_memory_usage() -> dict:
    """
    Returns a dictionary with memory usage statistics.
    """
    try:
        mem = psutil.virtual_memory()
        return {
            "total": f"{mem.total / (1024**3):.2f} GB",
            "available": f"{mem.available / (1024**3):.2f} GB",
            "used": f"{mem.used / (1024**3):.2f} GB",
            "percentage": f"{mem.percent}%"
        }
    except Exception as e:
        logging.error(f"Failed to get memory usage: {e}")
        return {"error": f"Failed to get memory usage: {e}"}

def get_disk_usage(path: str = '/') -> dict:
    """
    Returns disk usage statistics for a given path.
    """
    try:
        disk = psutil.disk_usage(path)
        return {
            "total": f"{disk.total / (1024**3):.2f} GB",
            "used": f"{disk.used / (1024**3):.2f} GB",
            "free": f"{disk.free / (1024**3):.2f} GB",
            "percentage": f"{disk.percent}%"
        }
    except FileNotFoundError:
        logging.error(f"Path '{path}' not found for disk usage.")
        return {"error": f"Path '{path}' not found."}
    except Exception as e:
        logging.error(f"Failed to get disk usage for '{path}': {e}")
        return {"error": f"Failed to get disk usage for '{path}': {e}"}

if __name__ == '__main__':
    get_system_info()
    get_cpu_usage()
    get_memory_usage()
    get_disk_usage('/')
