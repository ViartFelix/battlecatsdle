FROM php:8-alpine
COPY data.zip /tmp/data.zip
COPY docker/nginx/index.php /var/www/html/index.php
RUN apk add --no-cache unzip \
    && unzip /tmp/data.zip -d /tmp/extracted \
    && cp -r /tmp/extracted/bcdata/. /var/www/html \
    && rm -rf /tmp/data.zip /tmp/extracted
CMD ["php", "-S", "0.0.0.0:80", "-t", "/var/www/html", "/var/www/html/index.php"]
