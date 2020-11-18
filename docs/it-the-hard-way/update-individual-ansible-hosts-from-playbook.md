# Update Individual Ansible Hosts From Playbook

I found out you can update hosts individually using an Ansible playbook where you might normally set you `hosts:` variable to all.

To do this, use the `-i` switch and pay close attention to the syntax.  For example:

`/usr/bin/ansible-playbook -i "debian10," /home/jwinn/docs/yml/update-all.yml`

...will use the indicated playbook to update the single host `debian10`.

[***...Get back***](../it-the-hard-way.html)
