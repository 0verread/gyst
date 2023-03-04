CREATE TABLE IF NOT EXISTS `todolist` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255),
  `isDone` BOOLEAN DEFAULT false
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
