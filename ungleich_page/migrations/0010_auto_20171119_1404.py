# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2017-11-19 14:04
from __future__ import unicode_literals

from django.db import migrations
import djangocms_text_ckeditor.fields


class Migration(migrations.Migration):

    dependencies = [
        ('ungleich_page', '0009_ungleichheader_ungleichheaderitem'),
    ]

    operations = [
        migrations.AlterField(
            model_name='service',
            name='sub_title',
            field=djangocms_text_ckeditor.fields.HTMLField(),
        ),
    ]
