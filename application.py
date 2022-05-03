from flask import Flask, render_template, request, send_file
import json

import pandas as pd
import datetime as datetime

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/uploadData/', methods=['POST'])
def uploadData():
    # Save File
    f = request.files['inpFile']
    f.save(f.filename)
    return 'Successfully uploaded'

@app.route('/preprocess/', methods=['GET'])
def preprocess():
    
    filepath = 'output.csv'

    # Process data
    data = pd.read_csv('input_file.csv')
    df = pd.DataFrame()
    df['DateTime'] = data['Timestamp (YYYY-MM-DDThh:mm:ss)']
    df['Glucose'] = pd.to_numeric(data['Glucose Value (mg/dL)'])
    df.drop(df.index[:12], inplace=True)
    df['DateTime'] = pd.to_datetime(df['DateTime'], format='%Y-%m-%dT%H:%M:%S')
    df['Day'] = df['DateTime'].dt.date
    df = df.reset_index(drop=True)
    
    # Write file
    f = open(filepath, 'w')
    df.to_csv(filepath)
    f.close()
    
    return "Successfully pre-processed"

@app.route('/download/', methods=['GET'])
def download():
    filepath = 'output.csv'
    print("downloading data")
    return send_file(filepath, attachment_filename='output.csv')

@app.route('/deleteSessionData/', methods=['POST'])
def deleteSessionData():
    # Delete any uploaded files
    try: 
        # TODO remove working session files
        os.remove()
        return "Successfully removed session files"
    except:
        return "Error occurred while deleting session data"

if __name__ == "__main__":
    app.run(debug=True)