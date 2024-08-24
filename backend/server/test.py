import os
from dotenv import load_dotenv

load_dotenv()

MY_ENV_VAR = os.getenv('MONGO_PASSWORD')

print(MY_ENV_VAR)


# {
#     "username": "user123",
#     "company": "asdas",
#     "password": "abcd"
# }
