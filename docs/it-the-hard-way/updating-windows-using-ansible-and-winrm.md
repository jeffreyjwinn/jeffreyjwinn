---
id: 465
title: Updating Windows using Ansible and winrm
date: 2020-10-23T16:33:49-06:00
author: jwinn
layout: page
guid: https://jwinn.getamonkey.com/?page_id=465
---
It is possible to use _Anisble_ to update or interact with Windows.

To do this, you first need to install and configure _winrm_. This guide will not cover how to do that.

Once you have verified that _winrm_ is working, you can use a playbook like this to update Windows itself:

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">- hosts: corellia_win
  gather_facts: True

  vars:
    ansible_python_interpreter: /usr/bin/python3
    ansible_remote_tmp: '\tmp'
    ansible_user: &lt;YOUR USERNAME>
    ansible_ssh_port: 5986
    ansible_password: &lt;YOUR PASSWORD>
    ansible_connection: winrm
    ansible_winrm_server_cert_validation: ignore

  tasks:
    - win_updates:
        category_names:
         - SecurityUpdates
         - CriticalUpdates
         - UpdateRollups</pre>

&#8230;using this same approach, you should be able to do any number of things. For example, we can use _win_shell_ to get a return of the files in _C:\Temp_:

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">- hosts: corellia_win
  gather_facts: True

  vars:
    ansible_python_interpreter: /usr/bin/python3
    ansible_remote_tmp: '\tmp'
    ansible_user: &lt;YOUR USERNAME>
    ansible_ssh_port: 5986
    ansible_password: &lt;YOUR PASSWORD>
    ansible_connection: winrm
    ansible_winrm_server_cert_validation: ignore

  tasks:
    - name: List files from C:\Temp...
      win_shell: Get-ChildItem -Path C:\Temp | ForEach-Object { $_.Name }
      register: sqs_list

    - debug: 
       msg: "{{ sqs_list.stdout_lines|list }}"</pre>

&#8230;more to come on using this excellent, if very basic, administration tool. I like it as it makes sense to a UNIX-inclined administrator.