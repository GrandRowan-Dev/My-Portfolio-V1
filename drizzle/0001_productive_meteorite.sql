CREATE TABLE `portfolio_comments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_name` varchar(100) NOT NULL,
	`content` text NOT NULL,
	`profile_image` text,
	`is_pinned` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `portfolio_comments_id` PRIMARY KEY(`id`)
);
