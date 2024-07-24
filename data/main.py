from flask import Flask,request,jsonify
from config import studentsdata
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

@app.route("/getstudentsdata",methods=['POST'])
def getstudentdata():
    data = request.get_json()
    studentid = int(data["StudentID"])
    query = {"StudentID":studentid}
    try:
        results = studentsdata.find_one(query,{"_id":0})
        if results:
            return jsonify(results)
        else:
            return jsonify({})
    except Exception as e:
        print(e)

@app.route("/updatestudentdata",methods=['POST'])
def updatestudentdata():
    data = request.get_json()
    print(data)
    query = {"StudentID":data["StudentID"]}
    try:
        results = studentsdata.find_one(query,{"_id":0})
        if results:
            studentsdata.replace_one(query,data)
            return jsonify({"Status":"True"})
        else:
            return jsonify({})
    except Exception as e:
        print(e)

@app.route("/deletestudentdata",methods=['POST'])
def deletestudentdata():
    data = request.get_json()
    print(data)
    query = {"StudentID":data["StudentID"]}
    try:
        results = studentsdata.find_one(query,{"_id":0})
        if results:
            studentsdata.delete_one(query)
            return jsonify({"Status":"True"})
        else:
            return jsonify({})
    except Exception as e:
        print(e)

@app.route("/getallstudents",methods=['GET'])
def getallstudentsdata():
    try:
        results = list(studentsdata.find({},{"_id":0}))
        if results:
            return jsonify({"Allstudentsdata":results})
        else:
            return jsonify({})
    except Exception as e:
        print(e)

if __name__ == '__main__':
    app.run(debug=True)
