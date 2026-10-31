# syntax=docker/dockerfile:1
# check=error=true

# This Dockerfile is designed for production, not development.

# Make sure RUBY_VERSION matches the Ruby version in .ruby-version
ARG RUBY_VERSION=4.0.9
FROM ruby:${RUBY_VERSION}-alpine AS base

# Rails app lives here
WORKDIR /rails

# Install base packages
RUN apk add --no-cache bash jemalloc mariadb-connector-c ffmpeg tzdata

# Set production environment
ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development"

# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build gems
RUN apk add --no-cache build-base git mariadb-connector-c-dev yaml-dev

# Install application gems
COPY ./Gemfile ./Gemfile.lock ./.ruby-version ./
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile --gemfile

# Copy application code
COPY . .

# Precompile bootsnap code for faster boot times
RUN bundle exec bootsnap precompile app/ lib/

# Final stage for app image
FROM base

# Copy built artifacts: gems, application
COPY --from=build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
COPY --from=build /rails /rails

# Run and own only the runtime files as a non-root user for security
RUN addgroup -S -g 1000 rails && \
    adduser -D -u 1000 -G rails -s /bin/bash rails && \
    chown -R rails:rails db log storage tmp
USER 1000:1000

# Entrypoint prepares the database.
ENTRYPOINT ["/rails/entrypoint.sh"]

EXPOSE 3333
CMD ["./bin/rails", "server", "-b", "0.0.0.0", "-p", "3333"]
