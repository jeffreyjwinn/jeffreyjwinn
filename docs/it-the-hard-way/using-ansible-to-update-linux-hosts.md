---
id: 456
title: Using Ansible to Update Linux Hosts
date: 2020-10-21T15:30:40-06:00
author: jwinn
layout: page
guid: https://jwinn.getamonkey.com/?page_id=456
---
With much help from others on the Internet, I&#8217;ve set up a script to automate the updating of my important Linux hosts.

This is run from my Windows 10 WSL 2 instance using Kali-Linux.

The first step is to make sure that you can talk to your target host via _SSH_ without the need of a password. See [this post](https://jwinn.getamonkey.com/?page_id=443 "SSH Without Password Linux") for more on that.

Once that is done, you have to install _Ansible_ on your hosts (there are numerous guides on doing that) and configure _Ansible_ on the host you are going to work from.

As an example, here is an outtake from my _/etc/ansible/hosts_ file. Note that these are only my change in groups:

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">[servers]
endor
dantooine
kessel
hoth

[iot]
clockpi
yavin

[wsl]
corellia:2222</pre>

&#8230;note the entry under &#8220;_wsl_&#8220;; this is a way to use an alternate port for _Ansible_ to use (in my case, an alternate port for SSH on that target host). Note that you must be able to reference these hosts by their host names (although, you could use the host IPs instead). I do that by modifying my _hosts_ file under Windows 10 (which then gets updated on _WSL_ at boot).

I don&#8217;t need to modify the _/etc/ansible/ansible.cfg_ file, as I&#8217;ve been able to keep any changes I need in my playbook file.

A playbook file for _Ansible_ is essentially a recipe for _Ansible_ to follow written in Yet Another Markup Language (YAML). Here is my playbook file for updating all Linux hosts I care about. Included in this is _WSL_ itself, as well as one _KVM_ Virtual Machine (VM):

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">- hosts: all
  user: root
  gather_facts: True

  vars:
    ansible_python_interpreter: /usr/bin/python3

  tasks:
  - name: Update and upgrade CentOS and Red Hat machines...
    # ...this is a 'brute force' way to do it...dnf module is preffered (but offers no '--nobest')
    #warn: false
    #shell: 'dnf upgrade --nobest -y'
    dnf:
      state: latest
      skip_broken: True
      update_cache: True
    when: ansible_distribution == 'CentOS' or ansible_distribution == 'Red Hat Enterprise Linux'

  - name: Update and upgrade Debian and Ubuntu machines...
    apt:
      upgrade: yes
      update_cache: yes
      cache_valid_time: 86400
    when: ansible_distribution == 'Debian' or ansible_distribution == 'Ubuntu'

  - name: Update and upgrade Windows WSL Kali distro...
    apt:
      upgrade: yes
      update_cache: yes
      cache_valid_time: 86400
    when: ansible_distribution == 'Kali GNU/Linux'

  - name: Clean up leftover packages on CentOS and Red Hat machines...
    dnf:
      autoremove: True
    when: ansible_distribution == 'CentOS' or ansible_distribution == 'Red Hat Enterprise Linux'

  - name: Clean up leftover packages on Debian and Ubuntu machines...
    apt:
      autoremove: True
      purge: True
    when: ansible_distribution == 'Debian' or ansible_distribution == 'Ubuntu'

  - name: Clean up leftover packages on WSL Kali distro... 
    apt:
      autoremove: True
      purge: True
    when: ansible_distribution == 'Kali GNU/Linux'</pre>

Some notes on this file and its structure:

  * Using the &#8220;_when:_&#8221; statements, I am able to apply actions to hosts based on their Linux distribution
  * There are two steps to my update process; update to the latest and greatest, and then later, auto remove unused packages
  * I am explicitly telling _Ansible_ to &#8220;_gather_facts:_&#8220;, although it should do that be default. This is important to determine the distribution (distro) I am targeting.
  * I am still deciding if I need to shell _dnf_ explicitly with a &#8220;_&#8211;nobest_&#8221; call. Thanks, _Docker_.

_Ansible_ can be used for a dizzying array of things. Once it is set up and you understand it (including the power involved, especially the old UNIX no-no running as _root_), _Ansible_ is a great way to deploy packages, check system information and do just about anything you can think of using _SSH_ and some others.

I have this script in my _crontab_. We will see how that works out.