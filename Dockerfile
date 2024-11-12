FROM php:7.0-apache

COPY ./src .

RUN docker-php-ext-install mysqli 