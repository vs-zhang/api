FROM python:2.7-alpine

RUN apk update && apk add build-base postgresql-dev libffi-dev

ENV WORK_DIR /code

RUN mkdir -p $WORK_DIR

WORKDIR $WORK_DIR

ADD . $WORK_DIR

RUN pip install -r requirements.txt

CMD [ "manage", "run" ]
