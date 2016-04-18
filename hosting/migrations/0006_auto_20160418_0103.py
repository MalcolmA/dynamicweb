# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-18 01:03
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hosting', '0005_auto_20160418_0038'),
    ]

    operations = [
        migrations.AlterField(
            model_name='virtualmachinetype',
            name='hosting_company',
            field=models.CharField(choices=[('hetzner_nug', 'Hetzner No Uptime Guarantee'), ('hetzner', 'Hetzner'), ('hetzner_raid6', 'Hetzner Raid6'), ('hetzner_glusterfs', 'Hetzner Glusterfs'), ('bern', 'Bern')], max_length=15),
        ),
    ]
