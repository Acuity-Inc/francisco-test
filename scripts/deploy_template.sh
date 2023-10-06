#!/usr/bin/env bash

ignore_files=".git|.github|node_modules|scripts|README.md|README_TEMPLATE.md|template_config.yaml"

substitutions=`grep ':' template_config.yaml  | sed -e 's|: |:|g'| awk -F ':' '{ print "s|" $2  "|<<[(ds \"config\")." $1 "]>>|g" }'`
echo $substitutions

for input_file in `tree -I "${ignore_files}" -Ffai --noreport`
do
  if [ ! -d "${input_file}" ]; then
    echo "Processing file: ${input_file}"
    sed -i "$substitutions" ${input_file}
  fi
done

mv README.md README_SERVICE.md
mv README_TEMPLATE.md README.md
rm .github/workflows/github-actions.yml
mv .github/workflows/github-actions-template.txt .github/workflows/github-actions.yml
