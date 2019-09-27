#!/bin/sh
set -e
gzip -9k build/static/js/*
gzip -9k build/static/css/*
