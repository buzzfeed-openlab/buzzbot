
CREATE FUNCTION response_trigger() RETURNS trigger AS $$
DECLARE
BEGIN
  PERFORM pg_notify('responses', TG_TABLE_NAME || ',id,' || NEW.id );
  RETURN new;
END;
$$ LANGUAGE plpgsql;
 
CREATE TRIGGER response_table_trigger AFTER INSERT ON "Responses"
FOR EACH ROW EXECUTE PROCEDURE response_trigger();

-------

CREATE FUNCTION user_trigger() RETURNS trigger AS $$
DECLARE
BEGIN
  PERFORM pg_notify('users', TG_TABLE_NAME || ',id,' || NEW.id );
  RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_table_trigger AFTER UPDATE OF "firstName", "lastName" ON "Users"
FOR EACH ROW EXECUTE PROCEDURE user_trigger();
