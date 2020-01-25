#!/bin/bash
for i in {1..30}
do
  curl "https://www-league.nhlstatic.com/builds/site-core/01c1bfe15805d69e3ac31daa090865845c189b1d_1458063644/images/team/logo/current/"$i"_dark.svg" > $i.svg
done

# Missing VGK, WPG, ARI

# VGK  https://upload.wikimedia.org/wikipedia/en/a/ac/Vegas_Golden_Knights_logo.svg
# WPG  https://upload.wikimedia.org/wikipedia/en/9/93/Winnipeg_Jets_Logo_2011.svg
# ARI  https://upload.wikimedia.org/wikipedia/en/2/27/Arizona_Coyotes.svg