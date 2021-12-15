#   pip3 install --upgrade google-api-python-client google-auth-httplib2 google-auth-oauthlib gspread uuid
import gspread
import json
import uuid
from oauth2client.service_account import ServiceAccountCredentials

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ------------ultils----------------
def getGoogleSheetByID(sheet_id=0):
    # define the scope
    scope = ['https://spreadsheets.google.com/feeds',
             'https://www.googleapis.com/auth/drive']

    # add credentials to the account
    creds = ServiceAccountCredentials.from_json_keyfile_name(
        'app_google_key.json', scope)

    # authorize the clientsheet
    client = gspread.authorize(creds)

    # get the instance of the Spreadsheet
    sheet = client.open('disanvanhoahanoi')

    records_data = {}

    try:
        # -> get sheet disanvahoa of the Spreadsheet
        sheet_instance = sheet.get_worksheet(sheet_id)
        #  get all the records of the data
        records_data = sheet_instance.get_all_records()
    except Exception as ex:
        print('Error: ', ex)
        print('Create Sheet({sheet_id}) FAILED!')
        pass

    return records_data

def readJsonFile(filename):
    # data = {}
    with open(filename) as json_file:
        data = json.load(json_file)
    return data

def processData(records_data):
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
        
    return jsondata

# ------------APIs------------


@app.route('/')
def home():
    return "<h1>Welcome to HAIPB1982 APIs</h1>"


@app.route('/api/v1/getdata', methods=['GET', 'POST'])
def apo_get_data():
    type = request.args.get("type")
    res = {'code': 200, 'message': 'success', 'data': None}

    if not type:
        res['code'] = 400
        res['message'] = 'Wrong input parameters'
        return res

    sheet_id = 0
    if type == 'ditich':
        sheet_id = 1
    if type == 'thamquanao':
        sheet_id = 2

    data = getGoogleSheetByID(sheet_id)
    if not data:
        res['code'] = 500
        res['message'] = 'Problems in getting Google Sheet data!'
        return res
    else:
        res['data'] = processData(data)

    return res
