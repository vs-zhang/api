FROM vszhang/api

ENV CODE_DIR /code

RUN mkdir -p $CODE_DIR

WORKDIR $CODE_DIR

ADD . $CODE_DIR

RUN pip install -r requirements.txt

RUN ["chmod", "+x", "./entrypoint.sh"]

ENTRYPOINT ["./entrypoint.sh"]
