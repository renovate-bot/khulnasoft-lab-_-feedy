# Readme

Ansible playbook to deploy [FEEDy](https://github.com/khulnasoft-lab/feedy) on bare-metal with Redis, browserless and Caddy 2

Requires sudo permission

## Usage

On `Ubuntu 20.04`, [install ansible](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-ansible-on-ubuntu-20-04), then

```bash
sudo ansible-playbook rsshub.yaml
```

## Development

Install `vagrant`, then

```bash
./try.sh
ansible-playbook rsshub.yaml
```
