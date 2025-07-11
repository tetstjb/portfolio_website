# Base image: lightweight Ubuntu
FROM ubuntu:22.04

# Prevent interactive prompts (like tzdata config)
ENV DEBIAN_FRONTEND=noninteractive

# Install Nginx and clean up
RUN apt-get update && \
    apt-get install -y nginx && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Remove default site
RUN rm -rf /var/www/html/*

# Copy your portfolio site files into Nginx web root
COPY . /var/www/html

# Expose default HTTP port
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
