import requests
from bs4 import BeautifulSoup
import sys
username = sys.argv[1]
password = sys.argv[2]
s = requests.session()
url = "http://studentsite.gunadarma.ac.id/index.php/site/login"
data = {'username':username,'password':password}
s.post(url,data)
urlloged = "https://studentsite.gunadarma.ac.id/index.php/default/index"
r = []
data = []
r.append(s.get(urlloged))
data.append(r[0].text)
soup = BeautifulSoup(data[0], 'lxml')
span = soup.findAll("span")
try:
    dataout = span[0].text
except IndexError:
    dataout = "fail"
if len(dataout)==8:
#if len(span[0].text)==8:
    print '{"status" : "loged", "npm":"'+dataout+'"}'
else:
    print '{"status" : "failed to login"}'
