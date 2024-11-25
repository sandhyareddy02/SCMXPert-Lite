from pymongo import MongoClient

client = MongoClient('mongodb+srv://venatisandhya0810:zFApbIjXznu2WfnJ@cluster0.j8u06.mongodb.net/')

mongodb = client.get_database('SCMXpertLite')

