Some notes from my original installation to my CentOS Virtual Machine (VM) server (also my Docker server and others):

<pre class="wp-block-code"><code>for Kali:

virt-install --name Kali --memory 4096 --vcpus 4 --disk path=/home/images/Kali.qcow2,bus=virtio,size=250,format=qcow2 --cdrom /var/lib/libvirt/images/kali-linux-2019.4-light-amd64.iso --graphics vnc,listen=0.0.0.0 --noautoconsole --bridge virbr0 --os-variant=debian9

for Windows Server 2019:

virt-install --name WindowsServer2019 --memory 4096 --vcpus 4 --disk path=/home/images/WindowsServer2019.qcow2,bus=virtio,size=250,format=qcow2 --cdrom /var/lib/libvirt/images/17763.737.190906-2324.rs5_release_svc_refresh_SERVER_EVAL_x64FRE_en-us_1.iso --disk /usr/share/virtio-win/virtio-win.iso,device=cdrom --graphics vnc,listen=0.0.0.0 --noautoconsole --bridge virbr0 --os-variant=win2k19

for Windows Server 2016:

virt-install --name WindowsServer2016 --memory 4096 --vcpus 4 --disk path=/home/images/WindowsServer2016.qcow2,bus=virtio,size=250,format=qcow2 --cdrom /var/lib/libvirt/images/Windows_Server_2016_Datacenter_EVAL_en-us_14393_refresh.ISO --disk /usr/share/virtio-win/virtio-win.iso,device=cdrom --graphics vnc,listen=0.0.0.0 --noautoconsole --bridge virbr0 --os-variant=win2k16

for Debian 10:

virt-install --name Debian10 --memory 2046 --vcpus 4 --disk path=/home/images/Debian10.qcow2,bus=virtio,size=250,format=qcow2 --cdrom /var/lib/libvirt/images/debian-10.2.0-amd64-netinst.iso --graphics vnc,listen=0.0.0.0 --noautoconsole --bridge virbr0 --os-variant=debian10 --dry-run

for Ubuntu 19 Server:

virt-install --name UbuntuServer19 --memory 4096 --vcpus 4 --disk path=/home/images/UbuntuServer19.qcow2,bus=virtio,size=250,format=qcow2 --cdrom /var/lib/libvirt/images/ubuntu-19.10-live-server-amd64.iso --graphics vnc,listen=0.0.0.0 --noautoconsole --bridge virbr0 --os-variant=ubuntu19.04

for FreeBSD:

virt-install --name FreeBSD --memory 4096 --vcpus 4 --disk path=/home/images/FreeBSD.qcow2,bus=virtio,size=250,format=qcow2 --cdrom /var/lib/libvirt/images/FreeBSD-12.1-RELEASE-amd64-disc1.iso --graphics vnc,listen=0.0.0.0 --noautoconsole --bridge virbr0 --os-variant=freebsd12.0

for OpenSUSE-Leap:

virt-install --name OpenSUSE-Leap --memory 4096 --vcpus 4 --disk path=/home/images/OpenSUSE-Leap.qcow2,bus=virtio,size=250,format=qcow2 --cdrom /var/lib/libvirt/images/openSUSE-Leap-15.1-DVD-x86_64.iso --graphics vnc,listen=0.0.0.0 --noautoconsole --bridge virbr0 --os-variant=opensuse15.1

--
To try it:

 --dry-run

--
To remove before reinstalling:

virsh shutdown &lt;name>
virsh undefine &lt;name>
virsh destroy &lt;name>
--
to list all VMS:			virsh list --all
--
to start VM:				virsh start YOUR-VM-NAME
--
SNAPSHOTS:
to create:					virsh snapshot-create-as YOUR-VM-NAME --name SNAPSHOT-NAME
to list:					virsh snapshot-list YOUR-VM-NAME
to restore an snapshot:		virsh snapshot-revert YOUR-VM-NAME SNAPSHOT-NAME</code></pre>

[***...Get back***](../it-the-hard-way.html)
