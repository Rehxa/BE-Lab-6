create database week6db;
use week6db;
drop table journalists;
drop table articles;
drop table categories;
drop table articles_categories;
create table journalists (
	id int not null primary key auto_increment,
    name varchar(45) not null,
    email varchar(60) not null,
    bio text
);

create table articles (
	id int not null primary key auto_increment,
    title varchar(100) not null,
    content text not null,
    journalistId int,
    
    foreign key (journalistId) references journalists(id)
);

create table categories (
	id int not null primary key auto_increment,
    name varchar(45)
);

create table articles_categories(
	articleId int,
    categoryId int,
    
    foreign key (categoryId) references categories(id),
    foreign key (articleId) references articles(id)
);
DESCRIBE articles_categories;


-- Insert data into journalists table
INSERT INTO journalists (name, email, bio) VALUES
('Emily Parker', 'emily.parker@news.com', 'Award-winning political correspondent with 15 years experience'),
('Raj Patel', 'raj.patel@techchronicle.com', 'Senior technology reporter specializing in AI and cybersecurity'),
('Sophia Chen', 'sophia.chen@healthdigest.org', 'Medical journalist with a background in biochemistry'),
('Marcus Johnson', 'marcus.johnson@businessdaily.net', 'Financial markets expert and economic analyst'),
('Aisha Mohammed', 'aisha.mohammed@culturetoday.com', 'Arts and culture writer focusing on film and literature');

-- Insert data into categories table
INSERT INTO categories (name) VALUES
('Politics'),
('Technology'),
('Health'),
('Business'),
('Entertainment'),
('Science'),
('Environment');

-- Insert data into articles table
INSERT INTO articles (title, content, journalistId) VALUES
('Global Summit Addresses Climate Crisis', 'World leaders gathered to discuss new emissions targets...', 1),
('New AI Model Passes Medical Licensing Exam', 'The system scored in the top 10% of human test-takers...', 2),
('Study Links Mediterranean Diet to Longevity', 'Research shows 20% reduction in mortality rates...', 3),
('Tech Giant Announces Quantum Computing Breakthrough', 'The new processor solves problems in seconds that would take traditional computers years...', 2),
('Stock Markets Reach All-Time High', 'Major indices surge amid positive economic indicators...', 4),
('Oscar-Winning Director Announces New Project', 'The filmmaker revealed details about an upcoming historical drama...', 5),
('Researchers Discover New Marine Species', 'Deep-sea expedition uncovers previously unknown life forms...', 1),
('Renewable Energy Investments Soar', 'Global funding for solar projects increases by 35%...', 4),
('Pandemic Preparedness Plan Unveiled', 'WHO releases new guidelines for future health crises...', 3),
('Virtual Reality Concert Sets Attendance Record', 'Over 2 million fans attended the digital performance...', 5);

-- Insert data into articles_categories junction table
INSERT INTO articles_categories (articleId, categoryId) VALUES
(1, 1),  -- Climate summit → Politics
(1, 7),  -- Climate summit → Environment
(2, 2),  -- AI medical exam → Technology
(2, 3),  -- AI medical exam → Health
(2, 6),  -- AI medical exam → Science
(3, 3),  -- Diet study → Health
(4, 2),  -- Quantum computing → Technology
(4, 6),  -- Quantum computing → Science
(5, 4),  -- Stock markets → Business
(6, 5),  -- Director project → Entertainment
(7, 6),  -- Marine species → Science
(7, 7),  -- Marine species → Environment
(8, 4),  -- Renewable energy → Business
(8, 7),  -- Renewable energy → Environment
(9, 3),  -- Pandemic plan → Health
(10, 5); -- VR concert → Entertainment
select * from articles;
select * from journalists;
select * from categories;
