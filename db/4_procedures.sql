CREATE OR REPLACE PROCEDURE beers_rate(
    p_user_id INT,
    p_beer_id INT,
    p_new_rate INT,
    p_comment TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM review
        WHERE user_id = p_user_id AND beer_id = p_beer_id
    ) THEN
        UPDATE review
        SET rate = p_new_rate
        WHERE user_id = p_user_id AND beer_id = p_beer_id;
    ELSE
        INSERT INTO review (user_id, beer_id, rate, comment)
        VALUES (p_user_id, p_beer_id, p_new_rate, p_comment);
    END IF;
END;
$$;