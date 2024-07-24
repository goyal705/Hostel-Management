from flask import Flask,request,jsonify, render_template
from config import studentsdata, complaintsdata , users, roomsdata
from flask_cors import CORS
import random
import os
from findimage import find_image

app = Flask(__name__)
CORS(app) 

@app.route('/')
def home():
    return render_template('index.html')

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

@app.route("/getcomplaints",methods=['GET'])
def getallcomplaintsdata():
    try:
        results = list(complaintsdata.find({},{"_id":0}).sort({"Status":-1}))
        if results:
            return jsonify({"Allcomplaintsdata":results})
        else:
            return jsonify({})
    except Exception as e:
        print(e)

@app.route("/login",methods=["POST"])
def login():
    try:
        data=request.json
        query = {"username":data["username"],"password":data["password"]}
        result = users.find_one(query,{"_id":0,"password":0})
        name = ""
        if result:
            if result["usertype"] == "admin":
                name = "admin"
            elif result["usertype"] == "student":
                name = studentsdata.find_one({"StudentID":result["id"]})["StudentName"]
            else:
                name = ""
            return jsonify({"userType":result["usertype"],"Status":"True","id":result["id"],"name":name})
        else:
            return jsonify({"Status":"False"})
        
    except Exception as e:
        print(e)
        jsonify({"Status":"False"})        


@app.route("/seeprofile",methods=["POST"])
def seeprofile():
    try:
        data = request.json
        print(data)
        query = {"StudentID":int(data["userID"])}
        # image = find_image(str(data["userID"]))
        result = studentsdata.find_one(query,{"_id":0})
        if result:
            result["Status"]="True"
            # result["Image"]=image
            print(result)
            return jsonify(result)
        else:
            return jsonify({"Status":"False"})
    except Exception as e:
        print(e)
        return jsonify({"Status":"False"})

@app.route("/getwingroomno",methods=["POST"])
def getwingroomno():
    try:
        data = request.json
        if isinstance(data,str):
            userId = data
        else:
            userId = data["userID"]
        print(data)
        result={}
        for i in range(1,4):
            query={f"OccupiedBy{i}":int(userId)}
            response = roomsdata.find_one(query,{"_id":0})
            name = studentsdata.find_one({"StudentID":int(userId)},{"_id":0})
            if name:
                Name = name["StudentName"]
            else:
                Name = "No Student"
            if response:
                response["Name"]= Name
                response["Status"]= "True"
                # print(response)
                return jsonify(response)
            else:
                result["Name"]=Name
                result["Status"]="True"
                result["Wing"]="Not Allocated"
                result["RoomNumber"]="Not Allocated"
        
        # print(result)
        return jsonify(result)
    
    except Exception as e:
        print(e)
        return jsonify({"Status":"False"})

@app.route("/submitcomplaint",methods=["POST"])
def submitcomplaint():
    data = request.json
    try:
        while True:
            complaintnumber = random.randint(1,10000)
            iscomplaintpresent = complaintsdata.find_one({"ComplaintNumber":complaintnumber},{"_id":0})
            if not iscomplaintpresent:
                data["ComplaintNumber"]=complaintnumber
                data["ComplaintClosedDate"] = ""
                break
        print(data)
        complaintsdata.insert_one(data)
        return jsonify({"Status":"True"})
    except Exception as e:
        print(e)
        return jsonify({"Status":"False"})
        

if __name__ == '__main__':
    app.run(debug=True)
