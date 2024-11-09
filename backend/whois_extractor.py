import sys
import json
import whois
from datetime import datetime

def format_date(date):
    """Format a date or list of dates to a human-readable string without time."""
    if isinstance(date, list):
        # Format each date in the list and join them with commas
        return ", ".join(d.strftime("%Y-%m-%d") for d in date if isinstance(d, datetime))
    elif isinstance(date, datetime):
        # Format single date without time
        return date.strftime("%Y-%m-%d")
    return "null"

def extract_whois_info(url):
    try:
        w = whois.whois(url)
        return {
            'domainName': w.domain_name if w.domain_name else "null",
            'registrar': w.registrar if w.registrar else "null",
            'updated_date': format_date(w.updated_date) if w.updated_date else "null",
            'creationDate': format_date(w.creation_date) if w.creation_date else "null",
            'registryExpiryDate': format_date(w.expiration_date) if w.expiration_date else "null",
            'emails': w.emails if w.emails else "null",
            'org': w.org if w.org else "null",
        }
    except Exception as e:
        print(f"Error fetching WHOIS for {url}: {e}")
        return {
            'domainName': "null",
            'registrar': "null",
            'updated_date': "null",
            'creationDate': "null",
            'registryExpiryDate': "null",
            'emails': "null",
            'org': "null",
        }

if __name__ == "__main__":
    url = sys.argv[1]
    whois_info = extract_whois_info(url)
    print(json.dumps(whois_info))  # Output WHOIS data as JSON


# import sys
# import json
# import whois
# from datetime import datetime

# def format_date(date):
#     """Format a date or list of dates to a human-readable string."""
#     if isinstance(date, list):
#         # Format each date in the list and join them with commas
#         return ", ".join(d.strftime("%Y-%m-%d %H:%M:%S") for d in date if isinstance(d, datetime))
#     elif isinstance(date, datetime):
#         # Format single date
#         return date.strftime("%Y-%m-%d %H:%M:%S")
#     return "null"

# def extract_whois_info(url):
#     try:
#         w = whois.whois(url)
#         return {
#             'domainName': w.domain_name if w.domain_name else "null",
#             'registrar': w.registrar if w.registrar else "null",
#             'updated_date': format_date(w.updated_date) if w.updated_date else "null",
#             'creationDate': format_date(w.creation_date) if w.creation_date else "null",
#             'registryExpiryDate': format_date(w.expiration_date) if w.expiration_date else "null",
#             'emails': w.emails if w.emails else "null",
#             'org': w.org if w.org else "null",
#         }
#     except Exception as e:
#         print(f"Error fetching WHOIS for {url}: {e}")
#         return {
#             'domainName': "null",
#             'registrar': "null",
#             'updated_date': "null",
#             'creationDate': "null",
#             'registryExpiryDate': "null",
#             'emails': "null",
#             'org': "null",
#         }

# if __name__ == "__main__":
#     url = sys.argv[1]
#     whois_info = extract_whois_info(url)
#     print(json.dumps(whois_info))  # Output WHOIS data as JSON


# # whois_extractor.py

# import sys
# import json
# import whois

# def extract_whois_info(url):
#     try:
#         w = whois.whois(url)
#         return {
#             'domainName': w.domain_name if w.domain_name else "null",
#             'registrar': w.registrar if w.registrar else "null",
#             'updated_date': str(w.updated_date) if w.updated_date else "null",
#             'creationDate': str(w.creation_date) if w.creation_date else "null",
#             'registryExpiryDate': str(w.expiration_date) if w.expiration_date else "null",
#             'emails': w.emails if w.emails else "null",
#             'org': w.org if w.org else "null",
#         }
#     except Exception as e:
#         print(f"Error fetching WHOIS for {url}: {e}")
#         return {
#             'domain_name': "null",
#             'registrar': "null",
#             'updated_date': "null",
#             'creation_date': "null",
#             'expiration_date': "null",
#             'emails': "null",
#             'org': "null",
#         }

# if __name__ == "__main__":
#     url = sys.argv[1]
#     whois_info = extract_whois_info(url)
#     print(json.dumps(whois_info))  # Output WHOIS data as JSON
