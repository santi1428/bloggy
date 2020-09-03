FROM php:7.2-apache
WORKDIR /var/www/html/bloggy
COPY . /var/www/html/bloggy 
COPY laravel.conf /etc/apache2/sites-available/
RUN apt-get update && apt-get install -y \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev
RUN apt-get update && apt-get upgrade -y
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl
RUN docker-php-ext-configure gd --with-gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ --with-png-dir=/usr/include/
RUN docker-php-ext-install gd
RUN apt-get install unzip -y
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install 
RUN a2dissite 000-default.conf
RUN a2ensite laravel.conf 
RUN a2enmod rewrite 
RUN service apache2 restart
RUN curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install nodejs -y
RUN rm nodesource_setup.sh
RUN npm install
RUN npm update
RUN chown -R www-data:www-data storage/
RUN chmod 775 -R storage/
RUN apt-get clean && rm -rf /var/lib/apt/lists/
EXPOSE 80
