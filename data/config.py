import pymongo
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["HostelManagementSystem"]
studentsdata= db["StudentsData"]
complaintsdata=db["Complaints"]
users=db["Users"]
roomsdata=db["RoomsData"]