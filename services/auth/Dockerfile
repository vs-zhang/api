FROM vszhang/service_auth

ENV CODE_DIR /code

RUN mkdir -p $CODE_DIR

WORKDIR $CODE_DIR

ADD . $CODE_DIR

RUN pip install -r requirements.txt

RUN chmod +x ${CODE_DIR}/run.sh

CMD ${CODE_DIR}/run.sh
