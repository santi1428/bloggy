FROM php:7.2-apache
WORKDIR /var/www/html/bloggy
COPY . /var/www/html/bloggy 
COPY laravel.conf /etc/apache2/sites-available/
RUN apt-get update && apt-get install -y \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
    && docker-php-ext-install -j$(nproc) iconv \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd
RUN apt-get install zip unzip -y
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN a2dissite 000-default.conf
RUN a2ensite laravel.conf 
RUN a2enmod rewrite 
RUN service apache2 restart
# RUN composer install 
# RUN composer update 
RUN php artisan key:generate
# RUN php artisan passport:install
RUN chown -R www-data:www-data storage/
# RUN apt-get update &&\
#     curl -sL https://deb.nodesource.com/setup_10.x | -E bash - &&\
#     apt-get -y install nodejs &&\
#     ln -s /usr/bin/nodejs /usr/local/bin/node
RUN apt-get install npm -y
RUN npm install
RUN npm run production
RUN apt-get update && apt-get upgrade -y
RUN apt-get clean && rm -rf /var/lib/apt/lists/
EXPOSE 80