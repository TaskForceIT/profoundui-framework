
SET TRANSACTION ISOLATION LEVEL NO COMMIT;

CREATE TABLE CUSTMASTP (
  CSID INTEGER NOT NULL DEFAULT 0,
  CSNAME CHAR(50) NOT NULL DEFAULT ''
);

LABEL ON TABLE CUSTMASTP
  IS 'Customer Master' ;

-- Sample Data
INSERT INTO CUSTMASTP VALUES ('123', 'ABC Company');
INSERT INTO CUSTMASTP VALUES ('124', 'XYZ Company');
INSERT INTO CUSTMASTP VALUES ('125', 'PLS, Inc.');

