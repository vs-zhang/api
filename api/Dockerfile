FROM python:2.7-wheezy

ENV CODE_DIR /code

RUN mkdir -p $CODE_DIR

WORKDIR $CODE_DIR

ADD . $CODE_DIR

RUN pip install -r requirements.txt

CMD [ "manage", "run" ]
