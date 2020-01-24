get_chromedriver_version(){
  BASE_URL="https://chromedriver.storage.googleapis.com/LATEST_RELEASE_"
  FULL_VERSION="$(/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --version)"
  echo "${FULL_VERSION}"
  MAJOR_VERSION="${FULL_VERSION:14:2}"
  echo "${MAJOR_VERSION}"
  CHROMERDRIVER_VERSION="$(curl "${BASE_URL}""${MAJOR_VERSION}")"
  npm install chromedriver --chromedriver_version="${CHROMERDRIVER_VERSION}"
}

get_chromedriver_version
