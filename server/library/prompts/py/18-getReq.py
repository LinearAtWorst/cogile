import requests

r = requests.get('https://api.ipify.org?format=json')
print(r.status_code)
for k, v in r.headers.items():
    print('{0}: {1}'.format(k, v))
print(r.text)