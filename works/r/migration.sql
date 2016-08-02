-- Add settings

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

CREATE TABLE IF NOT EXISTS `rom_settings` (
  `id` int(11) NOT NULL auto_increment,
  `id_rom` int(11) NOT NULL,
  `key` varchar(256) NOT NULL,
  `value` tinyint(1) NOT NULL,
  `date_create` datetime NOT NULL,
  `date_update` datetime NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='Таблица с настройками доступа' AUTO_INCREMENT=10 ;

--
