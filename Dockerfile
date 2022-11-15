FROM php:7.4-fpm
WORKDIR /var/www/html/bloggy
COPY . /var/www/html/bloggy 
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer 
RUN curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install nodejs npm -y
RUN rm nodesource_setup.sh
RUN chown -R www-data:www-data storage/
RUN chmod 775 -R storage/
RUN apt-get clean && rm -rf /var/lib/apt/lists/
