#   pip3 install --upgrade google-api-python-client google-auth-httplib2 google-auth-oauthlib gspread uuid
import gspread
import json
import uuid
from oauth2client.service_account import ServiceAccountCredentials

def writeFile(res,file_name):
    f = open(file_name, "w+",encoding='utf-8')
    f.write(json.dumps(res))
    f.close()

def readJsonFile(filename):
    # data = {}
    with open(filename) as json_file:
        data = json.load(json_file)
    return data


def writeData(records_data, file_name):
    jsondata = []
    _quan = readJsonFile('quan_huyen.json')
    _phuong = readJsonFile('phuong_xa.json')

    for item in records_data:
        try:
            if item['store_name'] and item['coordinates']:
                item['id_detail'] = str(uuid.uuid4())
                item['simistorelocator_id'] = str(uuid.uuid4())
                item['zoom_level'] = 14
                
                _coordinates = item['coordinates'].split(',')
                item['latitude'] = float(_coordinates[0])
                item['longitude'] = float(_coordinates[1])
                
                phuong = item['phuong'] 
                
                for p in _phuong:
                    if phuong in p['name']:
                        item['phuong'] = str(p['id'])
                        item['city'] = str(p['districtID'])

                quan = item['city'] 
                for q in _quan:
                    if quan in q['name']:
                        item['city'] = str(q['id'])

                jsondata.append(item)
        except Exception as ex:
            print('Error: ',ex)
            print('Data row FAILED: ', item )
            
    
    writeFile(jsondata, file_name)


def getGoogleSheet():
    # define the scope
    scope = ['https://spreadsheets.google.com/feeds','https://www.googleapis.com/auth/drive']

    # add credentials to the account
    creds = ServiceAccountCredentials.from_json_keyfile_name('app_google_key.json', scope)

    # authorize the clientsheet 
    client = gspread.authorize(creds)

    # get the instance of the Spreadsheet
    sheet = client.open('disanvanhoahanoi')

    try:
        # -> get sheet disanvahoa of the Spreadsheet
        sheet_instance = sheet.get_worksheet(0)
        #  get all the records of the data
        records_data = sheet_instance.get_all_records()
        writeData(records_data,'disanvanhoa.json')
    except Exception as ex:
        print('Error: ',ex)
        print('Create disanvanhoa.json FAILED!')
        pass

    try:
        # -> get sheet ditich of the Spreadsheet
        sheet_instance = sheet.get_worksheet(1)
        #  get all the records of the data
        records_data = sheet_instance.get_all_records()
        writeData(records_data,'ditich.json')
    except Exception as ex:
        print('Error: ',ex)
        print('Create ditich.json FAILED!')
        pass

    try:
        # -> get sheet thamquanao of the Spreadsheet
        sheet_instance = sheet.get_worksheet(2)
        #  get all the records of the data
        records_data = sheet_instance.get_all_records()
        writeData(records_data,'thamquanao.json')
    except Exception as ex:
        print('Error: ',ex)
        print('Create thamquanao.json FAILED!')
        pass

    # try:
    #     # -> get sheet thamquanao of the Spreadsheet
    #     sheet_instance = sheet.get_worksheet(3)
    #     #  get all the records of the data
    #     records_data = sheet_instance.get_all_records()
    #     writeFile(records_data,'quan_huyen.json')
    # except:
    #     print('Create quan_huyen.json FAILED!')
    #     pass

    # try:
    #     # -> get sheet thamquanao of the Spreadsheet
    #     sheet_instance = sheet.get_worksheet(4)
    #     #  get all the records of the data
    #     records_data = sheet_instance.get_all_records()
    #     writeFile(records_data,'phuong_xa.json')
    # except:
    #     print('Create phuong_xa.json FAILED!')
    #     pass


# main
# crontab -e
# cd ~/public_html/ban-do-so/json && python3 app_google.py >> log.txt
if __name__ == "__main__":
    print('rock!!!')
    getGoogleSheet()

    print('DONE!!!')
