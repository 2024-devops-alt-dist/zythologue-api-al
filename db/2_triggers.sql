CREATE OR REPLACE FUNCTION check_abv() 
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.abv < 0 OR NEW.abv > 20 THEN
        RAISE EXCEPTION 'Le taux d''alcool (ABV) doit être compris entre 0 et 20';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_abv
BEFORE INSERT ON beer
FOR EACH ROW
EXECUTE FUNCTION check_abv();