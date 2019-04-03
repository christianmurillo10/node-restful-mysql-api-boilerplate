CREATE DATABASE `node_restful_mysql_live`;

USE `node_restful_mysql_live`;

/*Table structure for table `positions` */

DROP TABLE IF EXISTS `positions`;

CREATE TABLE `positions` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` SMALLINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `positions` */

INSERT  INTO `positions`(`id`,`name`,`created_at`,`updated_at`,`is_deleted`) VALUES (1,'Superadmin','2019-04-03 10:04:27','2019-04-03 10:04:27',0);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `position_id` INT(11) NOT NULL COMMENT 'refd to positions.id',
  `created_at` DATETIME NOT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `is_active` SMALLINT(1) NOT NULL DEFAULT '1' COMMENT '0=No 1=Yes',
  `is_deleted` SMALLINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `users` */

INSERT  INTO `users`(`id`,`email`,`username`,`password`,`position_id`,`created_at`,`updated_at`,`is_active`,`is_deleted`) VALUES (1,'superadmin@mail.com','superadmin','$2a$10$FcA0.uqiCopeLSdmLWRlSemSD/KkESUWIomgv863ePD5PzOj5QgOG',1,'2019-04-03 10:16:27','2019-04-03 10:16:27',1,0);
