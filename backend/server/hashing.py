from passlib.context import CryptContext

pwd_cxt = CryptContext(schemes=["bcrypt"], deprecated="auto")


class Hash:
    @staticmethod
    def bcrypt(password: str) -> str:
        return pwd_cxt.hash(password)

    @staticmethod
    def verify(hashed: str, normal: str) -> bool:
        return pwd_cxt.verify(normal, hashed)
