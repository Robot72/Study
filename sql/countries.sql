-- Вывод всех строк из таблиц 
SELECT *
    FROM `country_settings`
    INNER JOIN `country` 
    ON `country_settings`.id_country = `country`.id;
    
-- Выборка для списка параметров по странам
SELECT *
    FROM `country_settings`
    INNER JOIN `country` 
    ON `country_settings`.id_country = `country`.id
    ORDER BY `country_settings`.id_country;
