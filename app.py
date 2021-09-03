import pandas as pd
from flask import Flask, request, render_template, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/hello')
def hello_api():
    return jsonify({'Hello': request.remote_addr}), 200

@app.route('/data', methods=['POST'])
def data_para_api():

    teamType = request.json
    selectedTeamType = teamType['teamType']
    print('Posted:' , teamType['teamType'])
    
    data_path = 'static/records/20210817.xlsm'

    home_df = pd.read_excel(data_path, sheet_name="HomeAttackPlay-by-Play", usecols=["總球數","局數","投手","打者","球種","球速","結果","好壞球","投手球數","揮棒","Count","在壘與出局","Clip_ID","ExitVelo","LaunchAngle","Direction"], engine='openpyxl')
    home_data = home_df.dropna(subset=["總球數"]) # If 總球數 is Nan then del this row.
    home_data = home_data.fillna("")

    home_data_dict = home_data.to_dict(orient = 'records')

    guest_df = pd.read_excel(data_path, sheet_name="GuestAttackPlay-by-Play", usecols=["總球數","局數","投手","打者","球種","球速","結果","好壞球","投手球數","揮棒","Count","在壘與出局","Clip_ID","ExitVelo","LaunchAngle","Direction"], engine='openpyxl')
    guest_data = guest_df.dropna(subset=["總球數"]) # If 總球數 is Nan then del this row.
    guest_data = guest_data.fillna("")

    guest_data_dict = guest_data.to_dict(orient = 'records')

    game_dada_json = {
        'HomeAllLogs': home_data_dict,
        'GuestAllLogs': guest_data_dict,
    }
    
    if not request.json or not 'teamType' in request.json:
        return jsonify(), 400
    elif selectedTeamType == 'Guest':
        task = game_dada_json["GuestAllLogs"]
        return jsonify(task), 200
    else:
        task = game_dada_json["HomeAllLogs"]
        return jsonify(task), 200

@app.route('/parameter', methods=['POST'])
def parameter_api():

    teamType = request.json
    selectedTeamType = teamType['value']

    print('Posted:' , teamType['value'])
    
    data_path = 'static/records/20210817.xlsm'

    home_df = pd.read_excel(data_path, sheet_name="HomeAttackPlay-by-Play", usecols=["總球數","局數","投手","打者","球種","球速","結果","好壞球","投手球數","揮棒","Count","在壘與出局","Clip_ID","ExitVelo","LaunchAngle","Direction"], engine='openpyxl')
    home_data = home_df.dropna(subset=["總球數"]) # If 總球數 is Nan then del this row.
    home_data = home_data.fillna("")

    home_data_dict = home_data.to_dict(orient = 'records')

    guest_df = pd.read_excel(data_path, sheet_name="GuestAttackPlay-by-Play", usecols=["總球數","局數","投手","打者","球種","球速","結果","好壞球","投手球數","揮棒","Count","在壘與出局","Clip_ID","ExitVelo","LaunchAngle","Direction"], engine='openpyxl')
    guest_data = guest_df.dropna(subset=["總球數"]) # If 總球數 is Nan then del this row.
    guest_data = guest_data.fillna("")

    guest_data_dict = guest_data.to_dict(orient = 'records')

    game_dada_json = {
        'HomeAllLogs': home_data_dict,
        'GuestAllLogs': guest_data_dict,
    }
    
    if not request.json or not 'value' in request.json:
        return jsonify(), 400
    elif selectedTeamType == '客隊':
        task = game_dada_json["GuestAllLogs"]
        return jsonify(task,'客隊'), 200
    elif selectedTeamType == '主隊':
        task = game_dada_json["HomeAllLogs"]
        return jsonify(task, '主隊'), 200
    else:
        return jsonify('nothing'), 200


if __name__ == '__main__':
    app.config['JSON_AS_ASCII'] = False
    app.run(debug=True)
    # app.run(debug=False, host='0.0.0.0', port=5000)