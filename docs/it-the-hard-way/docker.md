From my experience, Docker (which is great, in the right hands) on Windows is not usable in the real world. You can&#8217;t really expose ports, and there is no loopback IP. So, I took to installing my main Docker on my CentOS server. Some working notes and examples of how I&#8217;ve used it so far&#8230;



<div id="ez-toc-container" class="ez-toc-v2_0_11 counter-hierarchy counter-decimal ez-toc-grey">
  <div class="ez-toc-title-container">
    <p class="ez-toc-title">
      Table of Contents
    </p>
    
    <span class="ez-toc-title-toggle"><a class="ez-toc-pull-right ez-toc-btn ez-toc-btn-xs ez-toc-btn-default ez-toc-toggle"><i class="ez-toc-glyphicon ez-toc-icon-toggle"></i></a></span>
  </div><nav>
  
  <ul class="ez-toc-list ez-toc-list-level-1">
    <li class="ez-toc-page-1 ez-toc-heading-level-2">
      <a class="ez-toc-link ez-toc-heading-1" href="https://jwinn.getamonkey.com/?page_id=92#OWASP_JuiceShop_setup_example" title="OWASP Juice-Shop setup example:">OWASP Juice-Shop setup example:</a>
    </li>
    <li class="ez-toc-page-1 ez-toc-heading-level-2">
      <a class="ez-toc-link ez-toc-heading-2" href="https://jwinn.getamonkey.com/?page_id=92#Adding_additional_services_at_startup" title="Adding additional services at startup:">Adding additional services at startup:</a>
    </li>
    <li class="ez-toc-page-1 ez-toc-heading-level-2">
      <a class="ez-toc-link ez-toc-heading-3" href="https://jwinn.getamonkey.com/?page_id=92#To_rename_image_name_(not_hostname,_etc_)" title="To rename image name (not hostname, etc.): ">To rename image name (not hostname, etc.): </a>
    </li>
    <li class="ez-toc-page-1 ez-toc-heading-level-2">
      <a class="ez-toc-link ez-toc-heading-4" href="https://jwinn.getamonkey.com/?page_id=92#To_keep_docker_container_%E2%80%9Cas_is%E2%80%9D_to_do_something_more_with_it_(such_as_add_exposed_ports)" title="To keep docker container &#8220;as is&#8221; to do something more with it (such as add exposed ports):">To keep docker container &#8220;as is&#8221; to do something more with it (such as add exposed ports):</a><ul class="ez-toc-list-level-4">
        <li class="ez-toc-heading-level-4">
          <ul class="ez-toc-list-level-4">
            <li class="ez-toc-heading-level-4">
              <a class="ez-toc-link ez-toc-heading-5" href="https://jwinn.getamonkey.com/?page_id=92#Backup_a_Docker_container_remotely" title="Backup a Docker container remotely">Backup a Docker container remotely</a>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul></nav>
</div>

## <span class="ez-toc-section" id="OWASP_JuiceShop_setup_example"></span>OWASP Juice-Shop setup example:<span class="ez-toc-section-end"></span>

The first thing we (often) want to do is to create a local storage space for our data. If we do not do this, the data in the container will not persist. That means, the next time we restart the container, it will go back to its original state, losing any data we&#8217;ve added since its creation. That&#8217;s bad.

I have found that when creating the volume for our container, it is wise to specifically locate the volume, rather than letting the Docker daemon do it for us.

To do this, [I turned to a guide I found](https://dbafromthecold.com/2018/05/02/changing-the-location-of-docker-named-volumes/) and created my volume in this way:

<pre class="wp-block-code"><code class="">docker volume create -d local-persist -o mountpoint=/home/docker/juice-shop --name=juice-shop</code></pre>

&#8230;this places the actual volume in a place I want it (_/home/docker/juice-shop_) rather than in the &#8220;normal&#8221; place on this _CentOS_ machine (_/var/lib/docker/volumes_).

Creating the rest of the bits needed to best utilize the volume is routine. Create local link to volume: 

<pre class="wp-block-code"><code class="">mkdir /home/jwinn/juice-shop</code></pre>

&#8230;this space if supposed to be a mount location for changes to the data. I honestly have yet to do much research into this or the usefulness of it, but there you go.

Now, run the initial instance (will pull if needed)…this will also attach to the created storage, name the container, expose port 3000 and set the container to always be running): 

<pre class="wp-block-code"><code class="">docker run -d --name juice-shop --mount source=juice-shop,target=/home/jwinn/juice-shop -p 3000:3000 --restart always bkimminich/juice-shop</code></pre>

Start as needed (optional, as it should always be running): 

<pre class="wp-block-code"><code class="">docker start juice-shop﻿</code></pre>



## <span class="ez-toc-section" id="Adding_additional_services_at_startup"></span>Adding additional services at startup:<span class="ez-toc-section-end"></span>

Add something like this custom script (initial credit goes [here](https://docs.docker.com/config/containers/multi-service_container/)) as _/docker-startextras.sh:_

<pre class="wp-block-code"><code class="">#!/bin/bash

# Start the first process
service ssh start

# Start the second process
service php7.3-fpm start

# Naive check runs checks once a minute to see if either of the processes exited.
# This illustrates part of the heavy lifting you need to do if you want to run
# more than one service in a container. The container exits with an error
# if it detects that either of the processes has exited.
# Otherwise it loops forever, waking up every 60 seconds

while sleep 60; do
        ps aux |grep ssh |grep -q -v grep
        PROCESS_1_STATUS=$?
        ps aux |grep php7.3-fpm |grep -q -v grep
        PROCESS_2_STATUS=$?
        # If the greps above find anything, they exit with 0 status
        # If they are not both 0, then something is wrong
        if [ $PROCESS_1_STATUS -ne 0 -o $PROCESS_2_STATUS -ne 0 ]; then
                echo "A Service process has exited...automatically restarting..."
                exit 1
        fi
done</code></pre>

Call this custom script by additions to _/docker-entrypoint.sh_ (before the ending &#8216;exec &#8220;$@&#8221;&#8216;).



Create volume for storage (e.g., user account): 

<pre class="wp-block-code"><code class="">docker volume create juice-shop</code></pre>

Create local link to volume: __

<pre class="wp-block-code"><code class="">mkdir /home/jwinn/juice-shop</code></pre>

Run initial instance (will pull if needed)…this will also attache to the created storage, name the container, expose port 3000 and set the container to always be running): 

<pre class="wp-block-code"><code class="">docker run -d --name juice-shop --mount source=juice-shop,target=/home/jwinn/juice-shop -p 3000:3000 --restart always bkimminich/juice-shop</code></pre>

Start as needed (optional, as it should always be running):

<pre class="wp-block-code"><code class="">docker start juice-shop</code></pre>

## <span class="ez-toc-section" id="To_rename_image_name_(not_hostname,_etc_)"></span>To rename image name (not hostname, etc.):_  
_ <span class="ez-toc-section-end"></span>

<pre class="wp-block-code"><code class="">docker tag  &lt;old> &lt;new>﻿</code></pre>

and then

<pre class="wp-block-code"><code class="">﻿docker rmi &lt;old></code></pre>

## <span class="ez-toc-section" id="To_keep_docker_container_%E2%80%9Cas_is%E2%80%9D_to_do_something_more_with_it_(such_as_add_exposed_ports)"></span>To keep docker container &#8220;as is&#8221; to do something more with it (such as add exposed ports):<span class="ez-toc-section-end"></span>

<pre class="wp-block-code"><code class="">docker commit nginx nginx2</code></pre>

&#8230;note that this **should not** be needed if you we are using a mounted volume for this container. If you trust that.

Then, add the new image from this copy…

<pre class="wp-block-code"><code class="">docker run -d --name nginx2 -p 2222:22 -p 443:443 -p 21:2121 --mount source=nginx,target=/home/jwinn/nginx -h nginx --restart always nginx2﻿</code></pre>

…then remove original container that was cloned…

<pre class="wp-block-code"><code class="">docker rm nginx</code></pre>

…and rename the image back to the original…

<pre class="wp-block-code"><code class="">docker container rename nginx2 nginx</code></pre>

…the rename the tag and remove unneeded tag…

<pre class="wp-block-code"><code class="">﻿docker tag nginx2 nginx
docker rmi nginx2</code></pre>

&#8230;I have found that this last step does not always work.

#### <span class="ez-toc-section" id="Backup_a_Docker_container_remotely"></span>Backup a Docker container remotely<span class="ez-toc-section-end"></span>

In this example, backing up a NGINX (web server) container via Secure Shell (SSH) where a key has been pre-shared. This could also be placed in your crontab to perform on a regular basis. Note that this _does not_ get your volume data, if any. I had a hard time with that, and the supposed volume area was empty anyway. The script:

<pre class="wp-block-code"><code class="">#!/bin/bash

# Get date for timestamping...
datenow=$(date +'%m-%d-at-%H-%M')
echo "Date and time: $datenow"

# Back up docker instance...
echo "Backup up container..."
/usr/bin/docker commit -p nginx "nginx-backup-$datenow"

# Save this commit to a tar file...
echo "Converting to file..."
/usr/bin/docker save -o "nginx-backup-$datenow.tar" "nginx-backup-$datenow"

echo "Compressing backup..."
/usr/bin/gzip "nginx-backup-$datenow.tar"

# Send file to Nextcloud backup area...
echo "Sending to Nextcloud backup area via SSH..."
/usr/bin/scp "nginx-backup-$datenow.tar.gz" www-data@dantooine:/data/jwinn/files/Backups/.

# Now, completely without checking to see if it made it, delete the original!
echo "Removing original file..."
/usr/bin/rm "nginx-backup-$datenow.tar.gz"</code></pre>

[***...Get back***](../it-the-hard-way.html)
